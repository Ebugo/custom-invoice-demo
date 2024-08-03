import HomePage from "@/app/page";
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// // Mock API functions directly in the test file
// const mockGetInvoiceTemplatesApi = jest.fn();
// const mockPostSaveInvoiceSettingApi = jest.fn();

// // Mock axios for font fetching
// jest.mock('axios');

// // Mock API responses
// const mockTemplates = [
//   { label: 'Template 1', value: '1', content: '<style></style><div>{{.Title}}</div>' },
// ];

// const mockFonts = [
//   { family: 'Open Sans', menu: 'https://fonts.googleapis.com/css2?family=Open+Sans' },
// ];

// // Override the default implementation for the mocked functions
// jest.mock('@/app/page', () => ({
// //   ...jest.requireActual('@/app/page'),
//   getInvoiceTemplatesApi: mockGetInvoiceTemplatesApi,
//   postSaveInvoiceSettingApi: mockPostSaveInvoiceSettingApi,
// }));

// describe('Home Component', () => {
//   beforeEach(() => {
//     // Reset mocks before each test
//     (mockGetInvoiceTemplatesApi as any).mockResolvedValue({ data: { Payload: mockTemplates } });
//     (mockPostSaveInvoiceSettingApi as any).mockResolvedValue(true); // Mock successful response
//     (axios.get as jest.Mock<any>).mockResolvedValue({ data: { items: mockFonts } });
//   });

//   test('renders component and loads templates and fonts', async () => {
//     render(<HomePage />);

//     // Check if the component renders correctly
//     expect(screen.getByText(/Business Settings/i)).toBeInTheDocument();
    
//     // Check if template options are loaded
//     await waitFor(() => expect(screen.getByText('Template 1')).toBeInTheDocument());
    
//     // Check if font options are loaded
//     expect(screen.getByRole('combobox', { name: /Choose font/i })).toBeInTheDocument();
//   });

//   test('submits form with valid data', async () => {
//     render(<HomePage />);

//     // Check that API functions are called
//     await waitFor(() => {
//       expect(mockGetInvoiceTemplatesApi).toHaveBeenCalled();
//       expect(axios.get).toHaveBeenCalled();
//     });

//     // You can also check that API functions are not called (e.g., for error cases)
//     expect(mockPostSaveInvoiceSettingApi).not.toHaveBeenCalled();
//   });

//   test('handles form submission errors', async () => {
//     // Mock API function to reject with an error
//     (mockPostSaveInvoiceSettingApi as any).mockRejectedValue(new Error('Submission failed'));

//     render(<HomePage />);

//     // Check that API functions are called
//     await waitFor(() => {
//       expect(mockGetInvoiceTemplatesApi).toHaveBeenCalled();
//       expect(axios.get).toHaveBeenCalled();
//       expect(mockPostSaveInvoiceSettingApi).toHaveBeenCalled();
//     });

//     // Check if error handling logic is triggered
//     expect(screen.queryByText(/Failed to add setting/i)).toBeNull(); // No error toast rendered
//   });
// });


describe("Page", () => {
  it("renders a heading", async () => {
    render(<HomePage />);

    await act(async () => {
      // Trigger updates, such as user interactions or state changes
      // For example, if HomePage makes an async call or updates its state
    });

    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toBeInTheDocument();
  });
});

afterEach(() => {
  cleanup();
});
