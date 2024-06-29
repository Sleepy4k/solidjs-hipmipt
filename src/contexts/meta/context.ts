import { createContext } from 'solid-js';
import { IContext } from '@interfaces';

const MetaContext = createContext<IContext.IMetaContext>();

export default MetaContext;
