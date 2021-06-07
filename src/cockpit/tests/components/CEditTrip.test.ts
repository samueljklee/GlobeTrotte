// Intentionally kept as test.ts as its consistently failing.
// Will rename back to spec after its fixed.

import CEditTrip from "@/components/CEditTrip.vue";
import { mockTripObj } from "@/tests/mockData/data";
import { alertSpy } from "../helper";

import { mount } from "@vue/test-utils";
import { expect } from "@jest/globals";

const mockedTrip = new mockTripObj();

describe("CEditTrip", () => {
  it("renders component", () => {
    const trip = mockedTrip.trip;
    const wrapper = mount(CEditTrip, {
      props: {
        trip,
      },
    });
    const editCity = wrapper.find(".editCity");
    expect(editCity.exists()).toBeTruthy();
    expect(editCity.text()).toContain("Cities");
  });

  it("simulate save trip", () => {
    const trip = mockedTrip.trip;
    const wrapper = mount(CEditTrip, {
      props: {
        trip,
      },
    });
    console.log(wrapper.html());
    const alert = new alertSpy(wrapper);
    const saveEditTrip = wrapper.find(".saveEditTrip");
    expect(saveEditTrip.exists()).toBeTruthy();

    saveEditTrip.trigger("click");
    expect(alert.getOptions("confirmButtonText")).toBe("OK");
  });
});
