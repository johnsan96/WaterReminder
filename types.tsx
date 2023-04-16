/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface CheckoutParamList extends CheckoutStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Home: undefined;
  Statistic: undefined;
  About: undefined;
};

export type CheckoutStackParamList = {
  BankAccount: undefined;
  Comment: undefined;
  Overview: undefined;
  PersonalData: undefined;
  Success: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
export type CheckoutStackScreenProps<
  Screen extends keyof CheckoutStackParamList
> = NativeStackScreenProps<CheckoutStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};
