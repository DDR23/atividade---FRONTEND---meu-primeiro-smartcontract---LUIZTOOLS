import { Button, Group, Image, Modal, Stack, Text, UnstyledButton } from "@mantine/core";
import ProviderDevice from "../../../utils/ProviderDevice";
import { HiOutlineWallet } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineSafety } from "react-icons/ai";
import { useAuth } from "../../../contexts/AuthContext";
import { Window } from "../../../types/web3config";

export default function Header() {
  const { isDesktop } = ProviderDevice();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<'connect' | ''>('');
  const { connectWallet, isLoading, walletAddress } = useAuth();

  const handleModalContent = (content: 'connect' | '') => {
    setModalContent(content);
    open();
  }

  useEffect(() => {
    if (walletAddress) {
      setModalContent('');
      close();
    }
  }, [walletAddress]);

  const modalConnect = () => {
    return (
      <Modal
        size='auto'
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}>
        <Stack align="center" gap="xs" w='16rem'>
          <Text>Connect Wallet</Text>
          <Button
            justify="center"
            fullWidth
            px='lg'
            leftSection={<Image src='/metamask.png' alt='metamask' width={26} height={26} />}
            onClick={connectWallet}
            loading={isLoading}
          >
            Metamask
            <Text fz='12' c='green' ml='xs' inline>{(window as Window).ethereum ? 'detected' : ''}</Text>
          </Button>
          <Button disabled justify="center" fullWidth px='lg' leftSection={<Image src='/phantom.png' alt='phantom' width={26} height={26} />}>Phantom - Coming soon</Button>
          <Group gap={4} c='green' mt='xs'>
            <AiOutlineSafety size={16} />
            <Text fz="xs" inline>Secure connection</Text>
          </Group>
        </Stack>
      </Modal>
    )
  }

  return (
    <>
      <Group pos='sticky' top='0' w='100%' px="lg" justify="space-between" bg='background' py='xs' gap={0} style={{ borderBottom: '1px solid #23232320' }}>
        <UnstyledButton component="a" href="/">
          <Group>
            <Image src='/coin.png' alt="logo-smartbet" style={{ width: '2rem' }} />
            <Text ff='heading' fw={700} visibleFrom="xs">SMART BET</Text>
          </Group>
        </UnstyledButton>
        <Group>
          {walletAddress ? (
            <Group>
              <Text inline>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</Text>
            </Group>
          ) : (
            <Button px={isDesktop ? 'xs' : '8'} onClick={() => handleModalContent('connect')}>
              <HiOutlineWallet size={22} />
              <Text visibleFrom="xs" pl='8'>Connect wallet</Text>
            </Button>
          )}
        </Group>
      </Group>
      {modalContent === 'connect' && modalConnect()}
    </>
  );
}
