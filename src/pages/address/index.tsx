import React from "react";

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

