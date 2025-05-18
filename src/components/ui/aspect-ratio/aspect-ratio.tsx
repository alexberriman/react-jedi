import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cleanDOMProps } from "../../../lib/utils";

function AspectRatio({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  const cleanProps = cleanDOMProps(props);
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...cleanProps} />;
}

export { AspectRatio };
