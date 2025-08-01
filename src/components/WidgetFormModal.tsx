import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#1e1e1e",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  minWidth: 400,
  maxHeight: "90vh",
  overflow: "auto",
  color: "white",
};

const widgetTypes = [
  { value: "chart", label: "Chart" },
  { value: "table", label: "Table" },
  { value: "text", label: "Text Block" },
];

interface WidgetFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    type: "chart" | "table" | "text";
    title: string;
    config: any;
    w?: number;
    h?: number;
  }) => void;
  initialData?: {
    id?: string;
    type: "chart" | "table" | "text";
    title: string;
    config: any;
    w?: number;
    h?: number;
  };
}

const WidgetFormModal: React.FC<WidgetFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [type, setType] = useState<"chart" | "table" | "text">("chart");
  const [title, setTitle] = useState("");
  const [config, setConfig] = useState<any>({});
  const [width, setWidth] = useState<number>(6);
  const [height, setHeight] = useState<number>(4);
  const [errors, setErrors] = useState({
    title: { hasError: false, message: "" },
    headers: { hasError: false, message: "" },
    chartData: { hasError: false, message: "" },
    tableRows: { hasError: false, message: "" },
    formError: "",
  });

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setTitle(initialData.title);
      setConfig(initialData.config || {});
      setWidth(
        initialData.w ||
          (initialData.type === "chart"
            ? 6
            : initialData.type === "table"
            ? 6
            : 4)
      );
      setHeight(
        initialData.h ||
          (initialData.type === "chart"
            ? 4
            : initialData.type === "table"
            ? 6
            : 2)
      );
    } else {
      setType("chart");
      setTitle("");
      setConfig({});
      setWidth(6);
      setHeight(4);
      if (type === "chart") {
        setConfig({ data: [{ name: "", value: "" }] });
      }
    }
    setErrors({
      title: { hasError: false, message: "" },
      headers: { hasError: false, message: "" },
      chartData: { hasError: false, message: "" },
      tableRows: { hasError: false, message: "" },
      formError: "",
    });
  }, [initialData, open]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: { hasError: false, message: "" },
      headers: { hasError: false, message: "" },
      chartData: { hasError: false, message: "" },
      tableRows: { hasError: false, message: "" },
      formError: "",
    };

    // Title validation
    if (!title.trim()) {
      newErrors.title = { hasError: true, message: "Title is required" };
      isValid = false;
    }

    // Type-specific validations
    if (type === "chart") {
      const hasEmptyData = config.data?.some(
        (item: any) => !item.name.trim() || item.value === ""
      );
      if (!config.data || config.data.length === 0 || hasEmptyData) {
        newErrors.chartData = {
          hasError: true,
          message: "All chart data fields are required",
        };
        isValid = false;
      }
    } else if (type === "table") {
      if (!config.data?.headers || config.data.headers.length === 0) {
        newErrors.headers = {
          hasError: true,
          message: "At least one header is required",
        };
        isValid = false;
      } else if (config.data.headers.length > 5) {
        newErrors.headers = {
          hasError: true,
          message: "Maximum 5 columns allowed",
        };
        isValid = false;
      }

      const hasEmptyCells = config.data?.rows?.some((row: any[]) =>
        row.some((cell) => !cell?.toString().trim())
      );
      if (hasEmptyCells) {
        newErrors.tableRows = {
          hasError: true,
          message: "All table cells must be filled",
        };
        isValid = false;
      }
    } else if (type === "text") {
      if (!config.content?.trim()) {
        newErrors.title = {
          hasError: true,
          message: "Text content is required",
        };
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setType(e.target.value as any);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setErrors({
      ...errors,
      title: { hasError: false, message: "" },
      formError: "",
    });
  };

  // === CHART ===
  const chartData = config.data || [];

  const handleChartChange = (
    index: number,
    field: "name" | "value",
    value: string | number
  ) => {
    const updated = [...chartData];
    updated[index] = {
      ...updated[index],
      [field]: field === "value" ? (value === "" ? 0 : Number(value)) : value,
    };
    setConfig({ ...config, data: updated });
    setErrors({
      ...errors,
      chartData: { hasError: false, message: "" },
      formError: "",
    });
  };

  const addChartRow = () => {
    setConfig({ ...config, data: [...chartData, { name: "", value: "" }] });
  };

  const removeChartRow = (index: number) => {
    const updated = chartData.filter((_: any, i: number) => i !== index);
    setConfig({ ...config, data: updated });
  };

  // === TABLE ===
  const headers = config.data?.headers || [];
  const rows = config.data?.rows || [];

  const setTableHeader = (headerString: string) => {
    const newHeaders = headerString.split(",").map((h) => h.trim());
    setConfig({
      ...config,
      data: {
        headers: newHeaders,
        rows: rows.map((r: any[]) => r.slice(0, newHeaders.length)),
      },
    });
    setErrors({
      ...errors,
      headers: { hasError: false, message: "" },
      formError: "",
    });
  };

  const handleTableCellChange = (
    rowIdx: number,
    colIdx: number,
    value: string
  ) => {
    const updatedRows = [...rows];
    updatedRows[rowIdx][colIdx] = value;
    setConfig({
      ...config,
      data: { headers, rows: updatedRows },
    });
    setErrors({
      ...errors,
      tableRows: { hasError: false, message: "" },
      formError: "",
    });
  };

  const addTableRow = () => {
    setConfig({
      ...config,
      data: { headers, rows: [...rows, Array(headers.length).fill("")] },
    });
  };

  const removeTableRow = (index: number) => {
    const updated = rows.filter((_: any, i: number) => i !== index);
    setConfig({ ...config, data: { headers, rows: updated } });
  };

  const renderConfigInputs = () => {
    if (type === "text") {
      return (
        <TextField
          label="Text Content"
          multiline
          rows={4}
          fullWidth
          value={config.content || ""}
          onChange={(e) => {
            setConfig({ ...config, content: e.target.value });
            setErrors({
              ...errors,
              title: { hasError: false, message: "" },
            });
          }}
          sx={{ mt: 2 }}
          error={errors.title.hasError}
          helperText={errors.title.message}
        />
      );
    }

    if (type === "chart") {
      return (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Chart Data
          </Typography>
          {chartData.map((entry: any, idx: number) => (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              key={idx}
              sx={{ mb: 1 }}
            >
              <Box sx={{ width: "45%" }}>
                <TextField
                  label="Label"
                  value={entry.name}
                  onChange={(e) =>
                    handleChartChange(idx, "name", e.target.value)
                  }
                  fullWidth
                  size="small"
                  error={errors.chartData.hasError && !entry.name.trim()}
                />
              </Box>
              <Box sx={{ width: "45%" }}>
                <TextField
                  label="Value"
                  type="number"
                  value={entry.value === 0 ? "" : entry.value}
                  onChange={(e) =>
                    handleChartChange(idx, "value", e.target.value)
                  }
                  fullWidth
                  size="small"
                  error={errors.chartData.hasError && entry.value === ""}
                />
              </Box>
              <Box>
                <IconButton
                  onClick={() => removeChartRow(idx)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Stack>
          ))}
          <Button variant="outlined" onClick={addChartRow} size="small">
            Add Row
          </Button>
          {errors.chartData.hasError && (
            <Typography color="error" variant="caption" display="block">
              {errors.chartData.message}
            </Typography>
          )}
        </Box>
      );
    }

    if (type === "table") {
      return (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Headers (comma separated, max 5)"
            fullWidth
            value={headers.join(", ")}
            onChange={(e) => setTableHeader(e.target.value)}
            error={errors.headers.hasError}
            helperText={errors.headers.message}
            size="small"
          />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Rows
          </Typography>
          {rows.map((row: any[], rowIdx: number) => (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              key={rowIdx}
              sx={{ mb: 1 }}
            >
              {headers.map((_header: string, colIdx: number) => (
                <Box key={colIdx} sx={{ width: `${80 / headers.length}%` }}>
                  <TextField
                    label={`Col ${colIdx + 1}`}
                    value={row[colIdx] || ""}
                    onChange={(e) =>
                      handleTableCellChange(rowIdx, colIdx, e.target.value)
                    }
                    fullWidth
                    size="small"
                    error={
                      errors.tableRows.hasError &&
                      !row[colIdx]?.toString().trim()
                    }
                  />
                </Box>
              ))}
              <Box>
                <IconButton
                  onClick={() => removeTableRow(rowIdx)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Stack>
          ))}
          {headers.length > 0 && (
            <Button variant="outlined" onClick={addTableRow} size="small">
              Add Row
            </Button>
          )}
          {errors.tableRows.hasError && (
            <Typography color="error" variant="caption" display="block">
              {errors.tableRows.message}
            </Typography>
          )}
        </Box>
      );
    }

    return null;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        type,
        title,
        config,
        w: width,
        h: height,
      });
      onClose();
    } else {
      // Don't overwrite the specific error messages with a generic one
      setErrors((prev) => ({
        ...prev,
        formError: "Please fix all validation errors",
      }));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6">
          {initialData ? "Edit Widget" : "Add Widget"}
        </Typography>

        {!initialData && (
          <TextField
            select
            label="Widget Type"
            value={type}
            onChange={handleTypeChange}
            fullWidth
            sx={{ mt: 2 }}
            size="small"
          >
            {widgetTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}

        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          sx={{ mt: 2 }}
          error={errors.title.hasError}
          helperText={errors.title.message}
          size="small"
        />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Width (1–12 columns)"
            type="number"
            value={width === 0 ? "" : width}
            onChange={(e) => {
              const value = e.target.value === "" ? 0 : Number(e.target.value);
              setWidth(Math.max(1, Math.min(12, isNaN(value) ? 0 : value)));
            }}
            fullWidth
            size="small"
            inputProps={{ min: 1, max: 12 }}
          />
          <TextField
            label="Height (1–12 rows)"
            type="number"
            value={height === 0 ? "" : height}
            onChange={(e) => {
              const value = e.target.value === "" ? 0 : Number(e.target.value);
              setHeight(Math.max(1, Math.min(12, isNaN(value) ? 0 : value)));
            }}
            fullWidth
            size="small"
            inputProps={{ min: 1, max: 12 }}
          />
        </Stack>

        {renderConfigInputs()}

        {errors.formError && (
          <Typography
            color="error"
            variant="caption"
            display="block"
            sx={{ mt: 1 }}
          >
            {errors.formError}
          </Typography>
        )}

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button onClick={onClose} size="small">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} size="small">
            {initialData ? "Save Changes" : "Add Widget"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default WidgetFormModal;
