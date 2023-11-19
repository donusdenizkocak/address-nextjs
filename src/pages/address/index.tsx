import React from "react";
import * as yup from "yup";

enum addressType{
    JOB="iş",
    HOME="ev",
}

type FormValues ={
    addressType: addressType;
    addressLine: string;
    street: string;
    post_code: string;
    location: string;
    userId: number;
    countryId: number;
    cityId: number;
    districtId: number;
    townId: number;  
}

const addressFormSchema = yup.object().shape({
    addressType: yup.string().required("Lütfen adress tipi satırını seçiniz"),
    addressLine: yup.string().required("Lütfen adress satırını giriniz"),
    street: yup.string().required("Lütfen street satırını giriniz"),
    post_code: yup.string().required("Lütfen posta kodu satırını giriniz"),
    location: yup.string().required("Lütfen konum satırını giriniz"),
    userId: yup.number().required("Lütfen kişi seçiniz"),
    countryId: yup.number().required("Lütfen ülke seçiniz"),
    cityId: yup.number().required("Lütfen şehir seçiniz"),
    districtId: yup.number().required("Lütfen ilçe seçiniz"),
    townId: yup.number().required("Lütfen mahalle seçiniz"),
  });

  const Address = () =>{
return (
    <>
    
    </>
)
  }