import { APP_NAME } from '@consts';
import MetaContext from './context';
import { Title, Link } from '@solidjs/meta';
import { IProviderProp } from '@interfaces';
import LOGOHIPMI from '@images/logo/hipmi.png';
import { createSignal, Component } from 'solid-js';

const MetaProvider: Component<IProviderProp> = (props: IProviderProp) => {
  const [title, setTitle] = createSignal(APP_NAME);

  const changeTitle = (title?: string) => {
    if (!title || title == '') setTitle(APP_NAME);
    else setTitle(title + ' | ' + APP_NAME);
  };

  return (
    <MetaContext.Provider value={{
      changeTitle,
    }}>
      <Title>{title()}</Title>
      <Link rel="icon" href={LOGOHIPMI} />
      {props.children}
    </MetaContext.Provider>
  );
};

export default MetaProvider;
