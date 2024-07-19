<?php
require_once 'config.php'; 

header('Content-Type: application/json');


function getAllDatesInMonth() {
    $daysInMonth = date('t');
    $currentMonth = date('Y-m');
    $dates = [];

    for ($day = 1; $day <= $daysInMonth; $day++) {
        $dates[] = $currentMonth . '-' . str_pad($day, 2, '0', STR_PAD_LEFT);
    }

    return $dates;
}


$stmt = $pdo->prepare("SELECT DISTINCT room_type FROM bookings");
$stmt->execute();
$roomTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);

$response = [];

foreach ($roomTypes as $roomType) {
    $type = $roomType['room_type'];

    
    $stmt = $pdo->prepare("SELECT checkin_date, checkout_date FROM bookings WHERE room_type = ?");
    $stmt->execute([$type]);
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    
    $bookedDates = [];
    foreach ($bookings as $booking) {
        $checkin = new DateTime($booking['checkin_date']);
        $checkout = new DateTime($booking['checkout_date']);

        
        while ($checkin < $checkout) {
            $bookedDates[] = $checkin->format('Y-m-d');
            $checkin->modify('+1 day');
        }
    }

    $allDates = getAllDatesInMonth();
    $freeDates = array_diff($allDates, $bookedDates);

    $response[] = [
        'room_type' => $type,
        'freeDates' => array_values($freeDates)
    ];
}

echo json_encode(['success' => true, 'roomFreeDates' => $response]);
?>
