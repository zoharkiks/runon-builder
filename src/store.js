import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNavbarStore = create(
  persist(
    (set) => ({
      widgets: [],
      addNavbarWidget: (widget) =>
        set((state) => ({ widgets: [...state.widgets, widget] })),
      removeNavbarWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((widget) => widget.id !== id),
        })),

      updateNavWidgetText: (id, newText) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, text: newText } : widget
          ),
        })),

      updateNavWidgetImage: (id, url) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, imgUrl: url } : widget
          ),
        })),
    }),

    {
      name: "nav-widget-storage",
    }
  )
);

export const useMainStore = create(
  persist(
    (set) => ({
      widgets: [],
      addMainWidget: (widget) =>
        set((state) => ({ widgets: [...state.widgets, widget] })),
      removeMainWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((widget) => widget.id !== id),
        })),

      updateMainWidgetText: (id, newText) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, text: newText } : widget
          ),
        })),

      updateMainWidgetImage: (id, url) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, imgUrl: url } : widget
          ),
        })),
    }),

    {
      name: "main-widget-storage",
    }
  )
);

export const useFooterStore = create(
  persist(
    (set) => ({
      widgets: [],
      addFooterWidget: (widget) =>
        set((state) => ({ widgets: [...state.widgets, widget] })),
      removeFooterWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((widget) => widget.id !== id),
        })),
      updateFooterWidgetText: (id, newText) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, text: newText } : widget
          ),
        })),

      updateFooterWidgetImage: (id, url) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, imgUrl: url } : widget
          ),
        })),
    }),
    {
      name: "footer-widget-storage",
    }
  )
);
