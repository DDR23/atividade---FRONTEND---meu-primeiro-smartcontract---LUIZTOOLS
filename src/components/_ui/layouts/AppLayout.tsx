import { Flex, Stack } from "@mantine/core";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import ProviderDevice from "../../../utils/ProviderDevice";

export default function AppLayout() {
  const { isDesktop } = ProviderDevice();

  return (
    <Stack h='100vh'>
      <Header />
      <Flex flex={1} justify={isDesktop ? 'start' : 'center'} ml={isDesktop ? '10vw' : '0'}>
        <Outlet />
      </Flex>
      <Footer />
    </Stack>
  );
}
