import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  Text,
  useApi,
  useInstructions,
  useTranslate,
  useExtension,
  Link,
  useSubscription,
  useSettings,
  Button,
  Icon,
  InlineLayout,
  Pressable,
  View,
  Grid,
  PaymentIcon,
  useLanguage,
  InlineSpacer,
  useSelectedPaymentOptions,
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";
import { HOSTNAME } from "../../../config";

// 1. Export the extension
export default reactExtension("purchase.thank-you.header.render-after", () => <Extension />);

function Extension() {
  const t = useTranslate();
  const api = useApi();
  const settings = useSettings();
  const [isBthVisible, setIsBthVisible] = useState(false);

  useEffect(() => {
    //@ts-ignore
    if (api.selectedPaymentOptions.current.some((item) => settings.mono_subscription_handle.includes(item.handle))) {
      setIsBthVisible(true);
    }
  }, []);

  //@ts-ignore
  const orderId = api.orderConfirmation.current.order.id.split("/").pop();
  // 3. Render a UI
  console.log("Handle: ", api.selectedPaymentOptions.current)
  return (
    isBthVisible && (
      <>
        <View>
          <Pressable to={`https://${HOSTNAME}/mono/create-payment-url?shop=${api.shop.myshopifyDomain}&orderId=${orderId}`}>
            <Button appearance="monochrome">{t("button_title")}</Button>
          </Pressable>
        </View>
      </>
    )
  );
}
