import useStore from './store';

// note: `useStore` directement dans les composants ou les hooks qui nécessitent d'être abonnés aux changements d'état. Cela permet à React de re-render automatiquement les composants lorsque l'état change.
// note: `storeActions.ts` pour centraliser les actions qui ne nécessitent pas un abonnement au store ou qui sont utilisées dans des fichiers externes, comme dans le dossier `utils` où l'on ne peut pas utiliser directement `useStore`.

// ----- Other Buttons -----
export const setClickedButton = (button: 'save' | 'publish' | null) =>
  useStore.getState().setClickedButton(button);
export const setDescriptionFields = (
  field: 'name' | 'description',
  value: string
) => useStore.getState().setDescriptionFields(field, value);
export const resetDescriptionFields = () =>
  useStore.getState().resetDescriptionFields();
export const setGridOptionSelected = (gridOption: 'none' | 'pixel' | 'full') =>
  useStore.getState().setGridOptionSelected(gridOption);
export const setPreviewUrl = (url: string) =>
  useStore.getState().setPreviewUrl(url);
