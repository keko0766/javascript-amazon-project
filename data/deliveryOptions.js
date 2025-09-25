export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents:0
  },
  {
    id: '2',
    deliveryDays: 4,
    priceCents:499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents:999
  }
]


export function getDeliveryOption(deliveryOptionId){
  let deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);

  return deliveryOption || deliveryOptions[0];
}

export function isWeekend(date){
  const day = date.format("d") // 0 = Sunday, 6 = Saturday
  return day === "0" || day === "6"
}

export function dataFormatWithoutWeekend(startDate, daysToAdd){
  let date = startDate.clone()
  let added = 0

  while (added < daysToAdd) {
    date = date.add(1, "day")
    if (isWeekend(date)) {
      daysToAdd++
    }
    added++
  }
  return date;
}

export function deliveryDateFormatting(item){
  const now = dayjs();
  const deliveryDate = dataFormatWithoutWeekend(now, item.deliveryDays);
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}