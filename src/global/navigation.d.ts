import { RootStackParamList } from '../routes/stack.routes';

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}
