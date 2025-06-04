import React, { useRef } from 'react';
import { AarcProvider } from './context/AarcProvider';
import MagicDepositModal from './components/MagicDepositModal';
import "@aarc-xyz/eth-connector/styles.css"
import './index.css';
import { AarcFundKitModal } from '@aarc-xyz/fundkit-web-sdk';
import { aarcConfig } from './config/aarcConfig';
import { magic } from './config/magicConfig';

const App = () => {
  const aarcModalRef = useRef(new AarcFundKitModal(aarcConfig));
  const aarcModal = aarcModalRef.current;

  return (
    <React.StrictMode>
        <AarcProvider aarcModal={aarcModal}>
          <MagicDepositModal
            isDark={true}
            logoLight="/logo.svg"
            logoDark="/logo.svg"
            aarcModal={aarcModal}
            magic={magic}
            onThemeToggle={() => {}}
          />
        </AarcProvider>
    </React.StrictMode>
  );
};

export default App;