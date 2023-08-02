<?php

// 从数据库或缓存中获取最新的温度读数 
$temp = getLatestTemperature(); 

// 返回JSON格式的数据
echo json_encode(array('temperature' => $temp));
