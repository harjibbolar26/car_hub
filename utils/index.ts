// "use client"

import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { fuel, limit, manufacturer, model, year } = filters;

  const headers = {
    "X-RapidAPI-Key": "2b58396f6emsh4ab03c2113aab71p1a62efjsn704ce5776aee",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&limit=${limit}&fuel_type=${fuel}&year=${year}`,
    // "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=toyota&model=camry",

    {
      headers: headers,
    }
  );

  const result = await response.json();

  console.log(result);
  return result;
}

export const calculateRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; //base rental price per day in $$
  const mileageFactor = 0.1; // additional rate per mile driven
  const ageFactor = 0.05; // additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rent per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");

  const { make, model, year } = car;
  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (title: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(title, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName
};
