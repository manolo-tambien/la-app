import dayjs from "dayjs";
// import * as XLSX from 'xlsx';
//import { Bounce, Slide, toast } from "react-toastify";
import { useMemo } from 'react';

export const generateLabels = (hour, direction) => {
  const isStart = direction === 'start';
  const [h, m, s] = hour.split(':');
  const firstMinute = isStart ? dayjs().startOf('day') : dayjs().endOf('day');
  let fromHour = dayjs().hour(parseInt(h)).minute(parseInt(m)).second(parseInt(s));

  const labels = [];
  const operation = isStart ? 'subtract' : 'add';
  while (isStart ? fromHour.isAfter(firstMinute) : fromHour.isBefore(firstMinute)) {
    isStart ? labels.unshift(fromHour.format('HH:mm:00')) : labels.push(fromHour.format('HH:mm:00'));
    fromHour = fromHour[operation](5, 'm');
  }

  if (isStart) labels.pop();
  else labels.shift();

  return labels;
}

export const getLatestHistoric = (historics) => {
  return historics.length > 0 ? historics[historics.length - 1] : null;
};

export const filterHistoricsByDay = (historics, date) => {
  return historics.filter(historic => dayjs(historic.date).isSame(date, 'day'));
};

// export const showToast = (content, type = 'success') => {
//   toast[type](content, {
//     position: "top-right",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//     transition: Slide,
//   });
// }

// export const showToastAlert = (content, type = 'success', handleClick, onClose) => {
//   toast[type](content, {
//     position: "top-right",
//     autoClose: false,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//     transition: Bounce,
//     onClick: handleClick,
//     onClose: onClose
//   });
// }

export const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY HH:mm');
};

export const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const lengthRegex = /.{8,}/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const specialCharRegex = /[\d`~!@#$%^&*()+=|;:'",.<>/?\\-]/;

  if (!lengthRegex.test(password)) {
    return 'La contraseña debe tener al menos 8 caracteres';
  }
  if (!uppercaseRegex.test(password)) {
    return 'La contraseña debe tener al menos una letra mayúscula';
  }
  if (!lowercaseRegex.test(password)) {
    return 'La contraseña debe tener al menos una letra minúscula';
  }
  if (!specialCharRegex.test(password)) {
    return 'La contraseña debe tener al menos un número o carácter especial';
  }
  return '';
};

export const formatNumber = (number) => {
  if (typeof number !== 'number') return undefined;
  return number.toLocaleString('en-US');
}

export const truncateNumber = (number) => {
  if (typeof number !== 'number') return undefined;
  const factor = Math.pow(10, 1);
  const truncated = Math.trunc(number * factor) / factor;
  return formatNumber(truncated);
}

// export const createReport = (latestHistoric, historicsByDay) => {
//   const wsData = [
//     [
//       "Capacidad instalada", `${latestHistoric.power} ${latestHistoric.power_str}`
//     ],
//     [
//       "Rendimiento diario", `${latestHistoric.daily} ${latestHistoric.pac_str}`
//     ],
//     [
//       "Rendimiento mensual", `${latestHistoric.monthly} ${latestHistoric.pac_str}`
//     ],
//     [
//       "Rendimiento anual", `${latestHistoric.yearly} MWh`
//     ],
//     [
//       "Rendimiento total", `${latestHistoric.total_yield} MWh`
//     ],
//     [
//       "Estación", latestHistoric.station_name
//     ],
//     [
//       "Modelo", latestHistoric.product_model
//     ]
//   ];

//   const ws = XLSX.utils.aoa_to_sheet(wsData)
//   ws["!cols"] = [];
//   (ws["!cols"][0] = {}).wpx = wsData[0][0].length * 6;

//   const ws2 = XLSX.utils.aoa_to_sheet([
//     ["Hora", "Valor"],
//     ...historicsByDay.map(h => [dayjs(h.date).format("HH:mm"), `${h.pac} ${h.pac_str}`])
//   ]);

//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Resumen");
//   XLSX.utils.book_append_sheet(wb, ws2, "Históricos");
//   XLSX.writeFile(wb, `Reporte-${dayjs(latestHistoric.date).format("DD-MM-YYYY")}.xlsx`, { compression: true });
// }

export const getColor = (color, saturation) => {
  const colorMappings = {
    'green': `rgba(61, 156, 26, ${saturation})`,
    'yellow': `rgba(240, 156, 0, ${saturation})`,
    'red': `rgba(219, 33, 35, ${saturation})`,
    'blue': `rgba(43, 164, 255, ${saturation})`
  };

  return colorMappings[color] || '';
};

export const getColorRed = (saturation) => {
  return `rgba(219, 33, 35, ${saturation})`;
};

export const getColorBlue = (saturation) => {
  return `rgba(43, 164, 255, ${saturation})`;
};

export const useDailyProductionComparison = (expectedProduction, dailyProduction) => {
  return useMemo(() => {
    if (expectedProduction > 0) {
      if (dailyProduction < expectedProduction) {
        return "rgba(240, 156, 26, 0.7)";
      } else if (dailyProduction > expectedProduction) {
        return "rgba(61, 156, 26, 0.7)";
      } else {
        return "rgba(61, 156, 26, 0.7)";
      }
    }
    return "black";
  }, [expectedProduction, dailyProduction]);
};