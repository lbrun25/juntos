import { useMemo } from "react";
import { useTheme } from "styled-components";

export const usePropsWithTheme = (props: any) => {
  const theme = useTheme();
  return useMemo(() => {
    const finalProps: Record<string, unknown> = {};
    for (const [prop, propValue] of Object.entries(props)) {
      if (prop.indexOf('padding') >= 0 || prop.indexOf('margin') >= 0) {
        const [propName, value] = prop.split('-'); // padding-[value]
        const valueWithGridUnit = parseInt(value) * theme.gridUnit;
        const finalProp = `${propName}-${valueWithGridUnit}`; // padding-[value] becomes padding-[value * gridUnit]
        finalProps[finalProp] = propValue;
      } else finalProps[prop] = propValue;
    }
    return finalProps;
  }, [props, theme]);
};
