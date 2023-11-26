
import React, { ChangeEvent, useEffect, useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/input";
import Select from "@/components/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getCountry } from "@/store/apps/country";
import { setAddress } from "@/store/apps/address";
import { getUser } from "@/store/apps/user";

enum addressType {
  JOB = "iş",
  HOME = "ev",
}

type FormValues = {
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
};

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

const defaultValues: FormValues = {
  addressType: addressType.HOME,
  addressLine: "",
  street: "",
  post_code: "",
  location: "",
  userId: 0,
  countryId: 0,
  cityId: 0,
  districtId: 0,
  townId: 0,
};

const Address = () => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>();

  // ** Selector
  const countryData: any[] = useSelector((state: RootState) => state.country.data);
  const userData: any[] = useSelector((state: RootState) => state.user.data);
  const addressLoading: boolean = useSelector(
    (state: RootState) => state.address.loading
  );
  const countryLoading: boolean = useSelector(
    (state: RootState) => state.country.loading
  );
  const userLoading: boolean = useSelector(
    (state: RootState) => state.user.loading
  );

  const [city, setCity] = useState<any[]>();
  const [district, setDistrict] = useState<any[]>();
  const [town, setTown] = useState<any[]>();
  const [location, setLocation] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(addressFormSchema),
  });

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation(`${latitude} ${longitude}`);
      });
    }
  }, []);

  const onSubmit = (payload: FormValues) => {
    dispatch(setAddress(payload));
    reset(defaultValues);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-center text-8xl text-transparent 
        bg-clip-text bg-gradient-to-b from-[#051F91] from-25% to-[#6DDB17]"
        >
          Adres Girişi
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-4 py-28 gap-y-2">
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="addressType"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Adres Tipi</option>
                      <option value={addressType.HOME}>
                        {addressType.HOME}
                      </option>
                      <option value={addressType.JOB}>{addressType.JOB}</option>
                    </Select>
                  </>
                )}
              />
              {errors.addressType && <>{errors.addressType.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Adres satırı"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("addressLine", { required: true })}
              />
              {errors.addressLine && <>{errors.addressLine.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Sokak bilgisi"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("street", { required: true })}
              />
              {errors.street && <>{errors.street.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Posta kodu"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("post_code", { required: true })}
              />
              {errors.post_code && <>{errors.post_code.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Konum bilgisi"
                className="mt-1"
                rounded="rounded-2xl"
                value={location}
                {...register("location", { required: true })}
              />
              {errors.location && <>{errors.location.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="userId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Kişi Seçiniz</option>
                      {userData?.map((k: any) => {
                        return (
                          <option value={k.id} key={k.id}>
                            {k.firstName} {k.lastName}
                          </option>
                        );
                      })}
                    </Select>
                  </>
                )}
              />
              {errors.userId && <>{errors.userId.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="countryId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                        const countryId: number = parseInt(event.target.value);
                        const country = countryData.find(
                          (k: any) => k.id === countryId
                        );
                        setCity(country?.city ?? []);
                        onChange(event);
                      }}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Ülke Seçiniz</option>
                      {countryData.map((k: any) => {
                        return (
                          <option value={k.id} key={k.id}>
                            {k.name}
                          </option>
                        );
                      })}
                    </Select>
                  </>
                )}
              />
              {errors.countryId && <>{errors.countryId.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="cityId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                        const cityId: number = parseInt(event.target.value);
                        const selectedCity = city?.find(
                          (k: any) => k.id === cityId
                        );
                        setDistrict(selectedCity?.district ?? []);
                        onChange(event);
                      }}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Şehir Seçiniz</option>
                      {city?.map((k: any) => {
                        return (
                          <option value={k.id} key={k.id}>
                            {k.name}
                          </option>
                        );
                      })}
                    </Select>
                  </>
                )}
              />
              {errors.cityId && <>{errors.cityId.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="districtId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                        const districtId: number = parseInt(event.target.value);
                        const selectedDistrict = district?.find(
                          (k: any) => k.id === districtId
                        );
                        setTown(selectedDistrict?.town ?? []);
                        onChange(event);
                      }}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">İlçe Seçiniz</option>
                      {district?.map((k: any) => {
                        return (
                          <option value={k.id} key={k.id}>
                            {k.name}
                          </option>
                        );
                      })}
                    </Select>
                  </>
                )}
              />
              {errors.districtId && <>{errors.districtId.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="townId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Mahalle Seçiniz</option>
                      {town?.map((k: any) => {
                        return (
                          <option value={k.id} key={k.id}>
                            {k.name}
                          </option>
                        );
                      })}
                    </Select>
                  </>
                )}
              />
              {errors.townId && <>{errors.townId.message}</>}
            </div>
          </div>
          <div className="text-center">
            {/* <button type="submit" disabled={addressLoading}>
          {addressLoading ? <strong>Loading...</strong> : "Submit"}
          </button> */}
            {addressLoading ? (
              <>
                <strong>Yükleniyor</strong>
              </>
            ) : (
              <button type="submit">Gönder</button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Address;