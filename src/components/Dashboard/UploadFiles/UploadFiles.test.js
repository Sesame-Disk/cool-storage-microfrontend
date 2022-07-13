import { render, screen } from "@testing-library/react";
import axios from "axios";
import Upload from "./UploadFiles";

jest.mock("axios");
jest.mock("huge-uploader");

describe("Upload", () => {
  it("should renders without crashing", () => {
    render(<Upload />);
    expect(screen.getByTestId(/upload-modal/i)).toBeInTheDocument();
  });
  it("should render upload files from props", () => {
    Object.assign(URL, {
      createObjectURL: () => {},
    });
    render(
      <Upload
        files={{
          target: {
            files: [
              {
                type: "file",
                name: "test file with more than 25 words",
                size: "200",
              },
              {
                type: "image",
                name: "test-image",
                size: "100",
              },
            ],
          },
        }}
      />
    );
    expect(screen.getByText(/test-image/i)).toBeInTheDocument();
  });
});
