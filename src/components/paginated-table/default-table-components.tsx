import {
  Clear as ClearIcon,
  SkipPrevious as SkipPreviousIcon,
  NavigateNext as NavigateNextIcon,
  FilterList as FilterListIcon,
  SkipNext as SkipNextIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { useTable } from "@xest-ui/data-table";
import type { Col, DTComponent } from "@xest-ui/data-table";

import {
  Button,
  Checkbox,
  IconButton,
  Input,
  LinearProgress,
  Modal,
  Paper,
  Popover,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { TableSkeleton } from "./table-skeleton";
import { useColumnLayoutAction } from "./column-layout-context";

import { Box } from "@mui/system";
import type { SxProps } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
const DATE_TIME_PICKER_FORMAT = "dd/MM/yyyy HH:mm";
const FILTER_DATE_TIME_VALUE_FORMAT = "yyyy-MM-dd HH:mm:ss";
import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import { format as formatDate, isValid as isValidDate, parse as parseDate } from "date-fns";
import isPickerDateStillBeingTyped from "./is-picker-date-still-being-typed";

const parseFilterDateValue = (value: unknown): Date | null => {
  if (value === null || value === undefined) {
    return null;
  }
  const raw = `${value}`.trim();
  if (!raw) {
    return null;
  }
  const fromFilterFormat = parseDate(raw, FILTER_DATE_TIME_VALUE_FORMAT, new Date());
  if (isValidDate(fromFilterFormat)) {
    return fromFilterFormat;
  }
  const fromDateString = new Date(raw);
  return isValidDate(fromDateString) ? fromDateString : null;
};

const CUSTOM_OPERATOR_LABELS: Record<"en" | "tr", Record<string, string>> = {
  en: {
    fullNameEquals: "Equals",
    fullNameContainsIgnoreCase: "Contains (ignore case)",
    searchVehicles: "Search by plate, make, model, department, legal owner, or assigned person",
    assignedUserContains: "Assigned person's name contains",
  },
  tr: {
    fullNameEquals: "Eşittir",
    fullNameContainsIgnoreCase: "İçerir (büyük/küçük harf duyarsız)",
    searchVehicles: "Plaka, marka, model, departman, yasal sahip veya atanan kişiye göre ara",
    assignedUserContains: "Atanan kişinin adı içerir",
  },
};

export const checkboxColumn = <T extends Record<string, any>>(column: Omit<Col<T>, "width">): Col<T> =>
  ({ ...column, checkboxColumn: true }) as Col<T>;

const isCheckboxColumn = (column: Col<any>) =>
  Boolean((column as { checkboxColumn?: boolean }).checkboxColumn);

const tableScrollbarSx = {
  scrollbarWidth: "thin",
  scrollbarColor: "transparent transparent",
  "&:hover": {
    scrollbarColor: "rgba(100, 116, 139, 0.4) transparent",
  },
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "transparent",
    borderRadius: "3px",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(100, 116, 139, 0.4)",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(100, 116, 139, 0.6)",
  },
} as const;

export const DefaultTableComponentsFn: (params: { rowKey?: string }) => Partial<DTComponent<any>> = ({
  rowKey,
}) => {
  return {
    Modal: ({ props, action }) => {
      return (
        <Modal
          open={props.openState}
          onClose={() => props.onClose(false)}
          title={props.title}
          className={props.className}
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: ["manageFilter.modal", "exportData.modal", "arrangeColumnsModal"].includes(action)
                ? "auto"
                : 600,
              bgcolor: "background.paper",
              boxShadow: 24,
              pt: 2,
              px: 4,
              pb: 3,
              maxHeight: "max(80vh, 600px)",
              overflow: "auto",
            }}
          >
            <Paper>
              {props.title}
              {props.children}
              {props.footer}
            </Paper>
          </Box>
        </Modal>
      );
    },
    Button: ({ props, action }) => {
      const columnLayout = useColumnLayoutAction();
      const layoutAction =
        action === "arrangeColumnsModal.finishBtn"
          ? "save"
          : action === "arrangeColumnsModal.resetView"
            ? "reset"
            : null;
      if (columnLayout && layoutAction) {
        return (
          <Button
            {...(props as any)}
            startIcon={props.icon}
            onClick={(event: unknown) => {
              columnLayout.mark(layoutAction);
              (props as any).onClick?.(event);
            }}
          />
        );
      }
      if (action?.startsWith("filterDropdownOperator.") && action !== "filterDropdownOperator.selectBtn") {
        const operator = action.slice("filterDropdownOperator.".length);
        const locale = "en";
        const label = CUSTOM_OPERATOR_LABELS[locale][operator];
        if (label) {
          return (
            <Button {...(props as any)}>
              <div style={{ fontWeight: "bold" }}>{label}</div>
            </Button>
          );
        }
      }
      if (action == "columnTitle.filter") {
        return (
          <IconButton {...(props as any)}>
            <FilterListIcon />
          </IconButton>
        );
      }
      if (["columnTitle.sort.asc", "columnTitle.sort.desc", "columnTitle.sort.remove"].includes(action)) {
        return <IconButton {...(props as any)} size="small" />;
      }
      if (action === "pagination.goToLast") {
        return (
          <Button {...(props as any)}>
            <SkipNextIcon />
          </Button>
        );
      }
      if (action === "pagination.goNext") {
        return (
          <Button {...(props as any)}>
            <NavigateNextIcon />
          </Button>
        );
      }
      if (action === "pagination.goToFirst") {
        return (
          <Button {...(props as any)}>
            <SkipPreviousIcon />
          </Button>
        );
      }
      if (action === "pagination.goBack") {
        return (
          <Button {...(props as any)}>
            <ChevronLeftIcon />
          </Button>
        );
      }
      if (action === "filters.FilterBtn") {
        return (
          <Button
            {...(props as any)}
            startIcon={<ClearIcon onClick={(e) => props.onIconClick?.(e)} />}
            variant="contained"
          />
        );
      }
      if (action === "saveFilter") {
        return <Button {...(props as any)} variant="contained" />;
      }
      return <Button {...(props as any)} startIcon={props.icon} />;
    },
    DatePicker: ({ props }) => {
      const pickerValue = useMemo(() => parseFilterDateValue(props.value), [props.value]);
      return (
        <DateTimePicker
          label="Date"
          value={pickerValue}
          inputFormat={DATE_TIME_PICKER_FORMAT}
          onChange={(value) => {
            if (isPickerDateStillBeingTyped(value)) return;
            props.onChange?.({
              target: {
                value: value && isValidDate(value) ? formatDate(value, FILTER_DATE_TIME_VALUE_FORMAT) : "",
              },
            } as unknown as ChangeEvent<HTMLInputElement>);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      );
    },
    Dropdown: ({ props, action }) => {
      const ignoreIncomingOpen = action === "columnFilter.dropdownItems";
      const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
      const [open, setOpen] = useState(ignoreIncomingOpen ? false : !!props.open);
      const uniqueId = useMemo(() => "dt-dropdown" + Math.random().toString(), []);

      useEffect(() => {
        if (ignoreIncomingOpen) return;
        if (!props.open) setAnchorEl(null);
        else setAnchorEl(document.getElementById(uniqueId));
      }, [props.open, uniqueId, ignoreIncomingOpen]);

      useEffect(() => {
        if (ignoreIncomingOpen) return;
        setOpen(!!props.open);
      }, [props.open, ignoreIncomingOpen]);

      const handleClose = () => {
        setOpen(false);
      };

      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
      };

      if (!open) {
        return (
          <div id={uniqueId} onClick={handleClick}>
            {props.children}
          </div>
        );
      }

      return (
        <div>
          <div id={uniqueId}>{action?.startsWith("table.title.") ? <FilterListIcon /> : props.children}</div>
          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handleClose} //doesnt work, how to close MUI element
          >
            <Box
              sx={{
                p: "10px",
              }}
            >
              {props.options.map((eachOption, index) => (
                <Box
                  key={String(eachOption.value) + index}
                  onClick={() =>
                    eachOption.onClick?.(eachOption.value, {
                      setOpenState: setOpen,
                    })
                  }
                >
                  {eachOption.label}
                </Box>
              ))}
            </Box>
          </Popover>
        </div>
      );
    },

    Input: ({ props: { value, ...props }, action }) => {
      if (action === "exportData.modal.checkBox") {
        return (
          <Checkbox
            checked={props.checked}
            onChange={(e) => {
              props.onChange?.(e);
            }}
          />
        );
      }

      if (action === "setFilterValue") {
        return (
          <Input
            value={value}
            type={props.type}
            onChange={(e: any) => {
              props.onChange?.(e);
            }}
            sx={{
              flexGrow: 1,
            }}
          />
        );
      }
      return (
        <Input
          value={value}
          type={props.type}
          onChange={(e: any) => {
            props.onChange?.(e);
          }}
        />
      );
    },

    Radio: ({ props }) => <Radio {...(props as any)} />,
    Table: ({ props }) => {
      const {
        data: { pageData, loading },
      } = useTable();
      const showSkeleton = loading && !pageData?.length;
      if (!pageData?.length && !loading) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderColor: "divider",
              borderStyle: "solid",
            }}
          >
            <Typography variant="h6">No data found</Typography>
          </Box>
        );
      }
      const colStyle: (col: Col<any>) => SxProps<any> = (col) => {
        switch (col.fixed) {
          case "left":
            return {
              position: "sticky",
              left: 0,
              zIndex: 1,
              backgroundColor: (theme) => theme.palette.background.default,
            };
          case "right":
            return {
              position: "sticky",
              right: 0,
              zIndex: 1,
              backgroundColor: (theme) => theme.palette.background.default,
            };
          default:
            return {};
        }
      };
      const tableColumns = (
        <>
          <TableHead>
            <TableRow>
              {props.columns.map((eachColumn, index) => (
                <TableCell
                  key={`${String(eachColumn.dataIndex) + index + index + String(eachColumn.dataIndex)}`}
                  padding={isCheckboxColumn(eachColumn) ? "checkbox" : undefined}
                  sx={{
                    width: eachColumn.width,
                    ...colStyle(eachColumn),
                    backgroundColor: (theme) => theme.palette.background.default,
                  }}
                >
                  {eachColumn.title}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {loading && pageData?.length ? (
                <TableCell colSpan={props.columns.length}>
                  <LinearProgress
                    sx={{
                      width: "inherit", // Set the ProgressBar width to fill its container
                      borderRadius: 10, // Optionally set borderRadius
                    }}
                  />
                </TableCell>
              ) : undefined}
            </TableRow>
          </TableHead>
        </>
      );
      const tableBody = showSkeleton ? (
        <TableSkeleton rows={8} cols={props.columns.length} />
      ) : (
        <TableBody>
          {pageData?.map((eachRow, rowIndex) => {
            const render = (col: Col<any>) => {
              try {
                return col.render?.(eachRow, rowIndex) || eachRow[col.dataIndex as any];
              } catch (err) {
                console.warn(`Data Table--- there was an error rendering row\n`, eachRow, err);
                return "error";
              }
            };
            return (
              <TableRow key={rowKey ? eachRow[rowKey] : rowIndex}>
                {props.columns.map((eachCol, colIndex) => (
                  <TableCell
                    key={colIndex + String(eachCol.dataIndex)}
                    padding={isCheckboxColumn(eachCol) ? "checkbox" : undefined}
                    sx={{
                      ...colStyle(eachCol),
                    }}
                  >
                    {render(eachCol)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      );
      return (
        <TableContainer component={Paper} sx={tableScrollbarSx}>
          <Table>
            {tableColumns}
            {tableBody}
          </Table>
        </TableContainer>
      );
    },
  };
};

export const DefaultTableComponents: Partial<DTComponent<any>> = DefaultTableComponentsFn({});
