import React from 'react';

type Props = {
  children: React.ReactChild
}

const ConfigProvider = ({ children }: Props): JSX.Element => (
  <>
    {children }
  </>
);

export default ConfigProvider;
