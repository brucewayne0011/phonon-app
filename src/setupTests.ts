// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () { },
      removeListener: function () { },
    };
  };

jest.mock("@capacitor-community/barcode-scanner", () => ({
  BarcodeScanner: {
    checkPermission: jest
      .fn()
      .mockReturnValue(Promise.resolve({ granted: true })),
    startScan: jest
      .fn()
      .mockReturnValue(Promise.resolve({ content: "123456" })),
    openAppSettings: jest.fn().mockReturnValue(Promise.resolve()),
    hideBackground: jest.fn().mockReturnValue(Promise.resolve()),
    showBackground: jest.fn().mockReturnValue(Promise.resolve()),
  },
}));
