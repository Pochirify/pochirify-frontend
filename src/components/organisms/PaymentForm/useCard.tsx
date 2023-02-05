import { useForm } from "react-hook-form";
import { cardResolver } from "utils/resolver";

export type Card = {
  cardNo: string;
  holderName: string; // TODO: どっかでUpperにする必要あり
  expire: string; // yy/mm
  securityCode: string;
};

export const useCard = () => {
  const {
    control,
    setValue,
    trigger,
    register,
    getValues,
    formState: { isValid, errors },
  } = useForm<Card>({ resolver: cardResolver });

  return {
    cardControl: control,
    cardSetValue: setValue,
    cardTrigger: trigger,
    cardRegister: register,
    cardGetValues: getValues,
    cardIsValid: isValid,
    cardErrors: errors,
  } as const;
};
