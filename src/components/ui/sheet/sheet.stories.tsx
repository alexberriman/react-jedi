import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "./sheet";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";

const meta = {
  title: "Components/Overlay/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a sheet description. Sheets are used for tasks that don&apos;t require the user
            to leave the current page.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>Sheet content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open from Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the left.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open from Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the right (default).</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open from Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the top.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open from Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  ),
};

export const NestedSheets: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open First Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>First Sheet</SheetTitle>
          <SheetDescription>This is the first sheet. You can open another one.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button>Open Nested Sheet</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Nested Sheet</SheetTitle>
                <SheetDescription>
                  This is a nested sheet that appears from the opposite side.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Long Content</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Terms of Service</SheetTitle>
          <SheetDescription>Please read our terms of service carefully.</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i}>
              <h3 className="font-medium">Section {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </p>
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Decline</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Accept</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open Custom Sheet</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Premium Features
          </SheetTitle>
          <SheetDescription className="text-purple-700 dark:text-purple-300">
            Unlock exclusive features with our premium plan.
          </SheetDescription>
        </SheetHeader>
        <div className="py-8 space-y-4">
          <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100">
              🚀 Unlimited Projects
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Create as many projects as you need.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100">
              ⚡ Priority Support
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Get help when you need it most.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100">
              🎨 Advanced Themes
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Access exclusive design options.
            </p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Maybe Later</Button>
          </SheetClose>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            Upgrade Now
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const WithoutModal: Story = {
  render: () => (
    <div className="relative h-[400px] w-full border rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Page Content</h2>
        <p className="mb-4">
          This sheet doesn&apos;t use modal behavior, so you can still interact with the page
          content behind it.
        </p>
        <Sheet modal={false}>
          <SheetTrigger asChild>
            <Button>Open Non-Modal Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Non-Modal Sheet</SheetTitle>
              <SheetDescription>
                You can still interact with the content behind this sheet.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p>Try clicking on the buttons in the background!</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="absolute bottom-4 left-4 space-x-2">
        <Button variant="secondary" onClick={() => alert("Background button clicked!")}>
          Background Button 1
        </Button>
        <Button variant="secondary" onClick={() => alert("Background button clicked!")}>
          Background Button 2
        </Button>
      </div>
    </div>
  ),
};
