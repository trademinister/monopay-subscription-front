import { reactExtension, Banner, BlockStack, Checkbox, Text, useApi, useTranslate, useExtension, Link, useSubscription, useSettings, Button, Icon, InlineLayout, Pressable, View, Grid, PaymentIcon, useLanguage, InlineSpacer, useOrder } from "@shopify/ui-extensions-react/customer-account";
import { use, useEffect, useState } from "react";
import { HOSTNAME } from "../../../config";
// 1. Export the extension
export default reactExtension("customer-account.order-status.block.render", () => <Extension />);

function Extension() {
  const t = useTranslate();
  const api = useApi();
  const settings = useSettings();
  const order = useOrder();
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // @ts-ignore
  const shop = api.shop.myshopifyDomain;

  useEffect(() => {
    //@ts-ignore
    fetch(`https://${HOSTNAME}/auth/get-gateway?shop=${api.shop.myshopifyDomain}&orderId=${order.id.split("/").pop()}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.gateways.includes(settings.mono_subscription_gateway) && (!data.activity || data.redirectUrl)) {
          setRedirectUrl(data.redirectUrl);
          setIsBtnVisible(true);
        } else {
          console.log("SKIP");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handlePress = () => {
    if (isLoading) return;
    setIsLoading(true);
  };
  // 3. Render a UI
  return (
    isBtnVisible && (
      <>
        <View>
          <Pressable
            loading={isLoading}
            onPress={handlePress}
            to={!redirectUrl ? `https://${HOSTNAME}/mono/create-payment-url?shop=${shop}&orderId=${order.id.split("/").pop()}` : redirectUrl}
          >
            <Button
              appearance="monochrome"
              loading={isLoading}
            >
              {t("button_title")}
            </Button>
          </Pressable>
        </View>
      </>
    )
  );
}
