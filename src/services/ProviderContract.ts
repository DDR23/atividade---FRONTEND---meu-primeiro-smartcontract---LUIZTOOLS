import SmartbetDisputes from "../abis/SmartbetDisputes.json";
import { BetsDetails } from "../types/BetsDetails";
import { DisputesDetails } from "../types/DisputesDetails";
import ProviderWallet from "./ProviderWallet";

interface Contract {
  methods: {
    owner: () => {
      call: () => Promise<string>;
    };
    getAllDisputeIds: () => {
      call: () => Promise<DisputesDetails[]>;
    };
    createDispute: (
      disputeName: string,
      disputeWallpaper: string,
      disputeCandidate1: string,
      disputeCandidateImage1: string,
      disputeCandidate2: string,
      disputeCandidateImage2: string
    ) => {
      send: (args: any) => Promise<any>;
    };
    disputes: (id: string) => {
      call: () => Promise<DisputesDetails>;
    };
    createBet: (
      disputeId: string,
      candidateNumber: string
    ) => {
      send: (args: any) => Promise<any>;
    };
    getBetDetails: (
      wallet: string,
      disputeId: string
    ) => {
      call: () => Promise<BetsDetails>;
    };
    finishDispute: (
      disputeId: number,
      winner: number
    ) => {
      send: (args: any) => Promise<any>;
    };
    claimPrize: (
      disputeId: number
    ) => {
      send: (args: any) => Promise<any>;
    };
  };
}

export default function ProviderContract(): Contract | null {
  const web3 = ProviderWallet();
  if (!web3) return null;

  const contractAddress = "0x4a54ec234FBaCA5de26f6847894C05cdB5F7F5F8";
  const contract = new web3.eth.Contract(SmartbetDisputes, contractAddress);
  return contract as unknown as Contract;
}
