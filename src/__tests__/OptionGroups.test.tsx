import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import OptionGroups from "@/components/OptionGroups";

jest.mock("@/redux/hooks", () => ({
  useAppSelector: () => "light",
}));

describe("OptionGroups", () => {
  it("renderiza opciones correctamente", () => {
    const onSelectGroup = jest.fn();

    const { getByText } = render(
      <OptionGroups
        groups={[{ label: "pants" }, { label: "vest" }]}
        activeGroupLabel="pants"
        onSelectGroup={onSelectGroup}
      />,
    );

    expect(getByText("pants")).toBeTruthy();
    expect(getByText("vest")).toBeTruthy();
  });

  it("ejecuta selección de grupo", () => {
    const onSelectGroup = jest.fn();

    const { getByText } = render(
      <OptionGroups
        groups={[{ label: "pants" }]}
        activeGroupLabel="pants"
        onSelectGroup={onSelectGroup}
      />,
    );

    fireEvent.press(getByText("pants"));

    expect(onSelectGroup).toHaveBeenCalled();
  });
});
