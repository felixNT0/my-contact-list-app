import * as LocalAuthentication from "expo-local-authentication";
import { useState } from "react";
import { Alert } from "react-native";

function useBioMetric() {
  const [BioMetric, setBioMetric] = useState(false);
  const [isBioMeticCorrect, setIsBioMeticCorrect] = useState(false);

  const fallBackFucction = () => {
    console.log("fallBackFucction");
  };

  const alertComponent = (
    title: string,
    mess: string,
    btnText: string,
    btnFn: () => void
  ) => {
    return Alert.alert(title, mess, [
      {
        text: btnText,
        onPress: btnFn,
      },
    ]);
  };

  const twoButtonAlert = () => {
    if (isBioMeticCorrect) {
      return Alert.alert("Welcome To MY CONTACTS LIST APP", "Continue", [
        {
          text: "Back",
          onPress: () => console.log("Sorry"),
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: async () => {
            console.log("Hello, Welcome");
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setBioMetric(compatible);
          },
          // style: "cancel",
        },
      ]);
    }
  };

  const handleBioMeticAuth = async () => {
    const isBioMeticCorrect = await LocalAuthentication.hasHardwareAsync();
    if (isBioMeticCorrect) {
      alertComponent(
        "Please Enter Password",
        "BioMetric Auth not supported",
        "ok",
        () => fallBackFucction()
      );
    }

    let supportedBiometrics;

    if (isBioMeticCorrect) {
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
    }

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

    if (!savedBiometrics) {
      return alertComponent(
        "Biometric record not found",
        "Please Login with password",
        "ok",
        () => fallBackFucction()
      );
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Biometric",
      cancelLabel: "cancel",
      disableDeviceFallback: true,
    });

    if (biometricAuth) {
      twoButtonAlert();
      setIsBioMeticCorrect(true);
    }
  };

  return { BioMetric, handleBioMeticAuth };
}

export default useBioMetric;
