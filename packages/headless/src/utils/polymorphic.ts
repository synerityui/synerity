import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
} from "react";

/** Props that any polymorphic component accepts. */
export type AsProp<C extends ElementType> = {
  as?: C;
};

/** Merges component-own props with the underlying element's props, letting own props win. */
export type PolymorphicProps<C extends ElementType, OwnProps = object> = AsProp<C> &
  OwnProps &
  Omit<ComponentPropsWithoutRef<C>, keyof OwnProps | "as">;

/** Same as PolymorphicProps but includes ref. */
export type PolymorphicPropsWithRef<C extends ElementType, OwnProps = object> = AsProp<C> &
  OwnProps &
  Omit<ComponentPropsWithRef<C>, keyof OwnProps | "as">;

export type PolymorphicPropsWithChildren<
  C extends ElementType,
  OwnProps = object,
> = PropsWithChildren<PolymorphicProps<C, OwnProps>>;
