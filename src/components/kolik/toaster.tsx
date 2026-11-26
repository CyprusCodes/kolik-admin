import type { FC } from "react";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useToaster, ToastBar, resolveValue } from "react-hot-toast";
import type { Toast } from "react-hot-toast";
import { alpha, useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

const MAX_VISIBLE_COLLAPSED = 3;
const MAX_VISIBLE_EXPANDED = 4;
const GAP = 12;

interface ToastItemProps {
  toast: Toast;
  index: number;
  isHovered: boolean;
  offset: number;
  onHeightUpdate: (id: string, height: number) => void;
  children: React.ReactNode;
}

const ToastItem: FC<ToastItemProps> = ({ toast, index, isHovered, offset, onHeightUpdate, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) {
        onHeightUpdate(toast.id, h);
      }
    };

    measure();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(measure);
      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [toast.id, onHeightUpdate]);

  let transform = "translate3d(0, 0, 0) scale(1)";
  let opacity = 1;
  let zIndex = 30;
  let pointerEvents: "auto" | "none" = "auto";

  if (!toast.visible) {
    transform = "translate3d(0, 24px, 0) scale(0.95)";
    opacity = 0;
    zIndex = 0;
    pointerEvents = "none";
  } else if (isHovered) {
    if (index < MAX_VISIBLE_EXPANDED) {
      transform = `translate3d(0, -${offset}px, 0) scale(1)`;
      opacity = 1;
      zIndex = 100 - index;
      pointerEvents = "auto";
    } else {
      transform = `translate3d(0, -${offset + 16}px, 0) scale(0.92)`;
      opacity = 0;
      zIndex = 0;
      pointerEvents = "none";
    }
  } else {
    if (index === 0) {
      transform = "translate3d(0, 0, 0) scale(1)";
      opacity = 1;
      zIndex = 30;
      pointerEvents = "auto";
    } else if (index === 1) {
      transform = "translate3d(0, -14px, 0) scale(0.95)";
      opacity = 0.85;
      zIndex = 20;
      pointerEvents = "auto";
    } else if (index === 2) {
      transform = "translate3d(0, -28px, 0) scale(0.90)";
      opacity = 0.6;
      zIndex = 10;
      pointerEvents = "auto";
    } else {
      transform = "translate3d(0, -36px, 0) scale(0.85)";
      opacity = 0;
      zIndex = 0;
      pointerEvents = "none";
    }
  }

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "100%",
        maxWidth: 420,
        pointerEvents,
        transform,
        transformOrigin: "bottom center",
        opacity,
        zIndex,
        transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
};

export const Toaster: FC = () => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [heights, setHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const { toasts, handlers } = useToaster({
    duration: 5000,
  });

  const handleHeightUpdate = useCallback(
    (id: string, h: number) => {
      handlers.updateHeight(id, h);
      setHeights((prev) => (prev[id] === h ? prev : { ...prev, [id]: h }));
    },
    [handlers],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    handlers.startPause();
  }, [handlers]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    handlers.endPause();
  }, [handlers]);

  const bottomRightToasts = useMemo(() => {
    return toasts.filter((t) => !t.position || t.position === "bottom-right");
  }, [toasts]);

  const otherToasts = useMemo(() => {
    return toasts.filter((t) => t.position && t.position !== "bottom-right");
  }, [toasts]);

  const reversed = useMemo(() => {
    const visibleOnly = bottomRightToasts.filter((t) => t.visible);
    return [...visibleOnly].reverse();
  }, [bottomRightToasts]);

  const offsets = useMemo(() => {
    const result: number[] = [];
    let acc = 0;
    for (let i = 0; i < reversed.length; i++) {
      result.push(acc);
      const h = heights[reversed[i].id] || reversed[i].height || 76;
      acc += h + GAP;
    }
    return result;
  }, [reversed, heights]);

  const containerHeight = useMemo(() => {
    if (reversed.length === 0) return 0;
    const baseHeight = heights[reversed[0]?.id] || reversed[0]?.height || 76;
    if (!isHovered) {
      const peekOffset = Math.min(reversed.length - 1, MAX_VISIBLE_COLLAPSED - 1) * 14;
      return baseHeight + peekOffset;
    }
    const maxIdx = Math.min(reversed.length, MAX_VISIBLE_EXPANDED) - 1;
    const lastToastHeight = heights[reversed[maxIdx]?.id] || reversed[maxIdx]?.height || 76;
    return offsets[maxIdx] + lastToastHeight;
  }, [reversed, heights, isHovered, offsets]);

  if (!mounted) return null;

  return (
    <>
      {}
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 420,
          maxWidth: "calc(100vw - 32px)",
          height: containerHeight,
          pointerEvents: reversed.length > 0 ? "auto" : "none",
          transition: "height 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {}
        {isHovered && reversed.length > MAX_VISIBLE_EXPANDED && (
          <Box
            sx={{
              position: "absolute",
              top: -30,
              right: 0,
              backgroundColor: alpha(theme.palette.neutral[800], 0.85),
              backdropFilter: "blur(6px)",
              color: theme.palette.common.white,
              fontSize: "0.75rem",
              fontWeight: 600,
              borderRadius: 5,
              px: 1.5,
              py: 0.5,
              boxShadow: theme.shadows[8],
              pointerEvents: "none",
              transition: "opacity 0.2s ease",
            }}
          >
            +{reversed.length - MAX_VISIBLE_EXPANDED} more
          </Box>
        )}

        {reversed.map((t, index) => (
          <ToastItem
            key={t.id}
            toast={t}
            index={index}
            isHovered={isHovered}
            offset={offsets[index] || 0}
            onHeightUpdate={handleHeightUpdate}
          >
            {t.type === "custom" ? (
              resolveValue(t.message, t)
            ) : (
              <ToastBar
                toast={t}
                position="bottom-right"
                style={{
                  ...t.style,
                  backdropFilter: "blur(8px)",
                  background:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.neutral[900], 0.95)
                      : alpha(theme.palette.neutral[900], 0.9),
                  color: theme.palette.common.white,
                  boxShadow: theme.shadows[16],
                  borderRadius: 12,
                  border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
                  padding: "10px 16px",
                  maxWidth: 420,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            )}
          </ToastItem>
        ))}
      </Box>

      {}
      {otherToasts.map((t) => {
        const isTop = (t.position || "").includes("top");
        const isCenter = (t.position || "").includes("center");
        const isLeft = (t.position || "").includes("left");
        const offset = handlers.calculateOffset(t, { defaultPosition: "top-center" });

        return (
          <Box
            key={t.id}
            sx={{
              position: "fixed",
              zIndex: 9999,
              top: isTop ? 24 : undefined,
              bottom: !isTop ? 24 : undefined,
              left: isLeft ? 24 : isCenter ? "50%" : undefined,
              right: !isLeft && !isCenter ? 24 : undefined,
              transform: isCenter
                ? `translate3d(-50%, ${offset * (isTop ? 1 : -1)}px, 0)`
                : `translate3d(0, ${offset * (isTop ? 1 : -1)}px, 0)`,
              transition: "all 0.25s ease",
              pointerEvents: t.visible ? "auto" : "none",
              opacity: t.visible ? 1 : 0,
            }}
          >
            {t.type === "custom" ? resolveValue(t.message, t) : <ToastBar toast={t} position={t.position} />}
          </Box>
        );
      })}
    </>
  );
};
