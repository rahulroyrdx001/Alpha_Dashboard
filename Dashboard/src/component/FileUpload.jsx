import Papa from "papaparse";

const FileUpload = ({ folders, setFolders, activeFolder }) => {
  const handleFileUpload = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const newReports = [];
      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = () => {
          Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              const data = result.data;
              const headers = Object.keys(data[0]);
              const currentDate = new Date().toLocaleDateString();

              const report = {
                id: `${file.name}-${index}`,
                name: file.name,
                rowData: data,
                columnDefs: headers.map((header) => ({ field: header })),
                isActive: false,
                tags: [],
                dateAdded: currentDate,
              };

              newReports.push(report);

              if (newReports.length === files.length) {
                setFolders((prevFolders) => ({
                  ...prevFolders,
                  [activeFolder]: {
                    ...prevFolders[activeFolder],
                    reports: [
                      ...prevFolders[activeFolder].reports,
                      ...newReports,
                    ],
                  },
                }));
              }
            },
          });
        };
        reader.readAsText(file);
      });
    }
  };

  return (
    <input
      type="file"
      accept=".csv"
      multiple
      onChange={handleFileUpload}
      style={{ marginBottom: "20px" }}
    />
  );
};

export default FileUpload;
