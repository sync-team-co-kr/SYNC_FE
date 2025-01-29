import { IMember } from '@customTypes/member';
import { ProjectPayload, RawProject } from '@customTypes/project';
import { create } from 'zustand';

interface ProjectActions {
  actions: {
    setProject: (project: RawProject) => void;
    setTitle: (title: string) => void;
    setThumbnail: (
      thumbnailType: 'E' | 'C' | 'I',
      thumbnail: string | Blob,
    ) => void;
    setSubTitle: (subTitle: string) => void;
    setDescription: (description: string) => void;
    setStartDate: (date: Date) => void;
    setEndDate: (date: Date) => void;
    setMembers: (members: IMember[]) => void;
    clearProject: () => void;
  };
}

interface ProjectState {
  projectId: number;
  payload: ProjectPayload;
  members: IMember[];
}

const initialState: ProjectState = {
  projectId: 0,
  payload: {
    title: '',
    thumbnail: {
      type: 'N',
      value: '',
    },
    subTitle: '',
    description: '',
    startDate: undefined,
    endDate: undefined,
  },
  members: [],
};

const useProjectStore = create<ProjectState & ProjectActions>((set) => ({
  ...initialState,
  actions: {
    setProject: ({ projectId, ...projectPayload }) => {
      set(() => ({
        projectId,
        payload: {
          ...projectPayload,
          startDate: projectPayload.startDate
            ? new Date(projectPayload.startDate)
            : undefined,
          endDate: projectPayload.endDate
            ? new Date(projectPayload.endDate)
            : undefined,
          thumbnail: projectPayload.thumbnail
            ? {
                type: 'E',
                value: projectPayload.thumbnail,
              }
            : {
                type: 'N',
                value: '',
              },
        },
      }));
    },
    setTitle: (title) => {
      set((state) => ({
        payload: {
          ...state.payload,
          title,
        },
      }));
    },
    setThumbnail: (thumbnailType, thumbnail) => {
      set((state) => ({
        payload: {
          ...state.payload,
          thumbnail: {
            type: thumbnailType,
            value: thumbnail,
          },
        },
      }));
    },
    setSubTitle: (subTitle) => {
      set((state) => ({
        payload: {
          ...state.payload,
          subTitle,
        },
      }));
    },
    setDescription: (description) => {
      set((state) => ({
        payload: {
          ...state.payload,
          description,
        },
      }));
    },
    setStartDate: (date) => {
      set((state) => ({
        payload: {
          ...state.payload,
          startDate: date,
        },
      }));
    },
    setEndDate: (date) => {
      set((state) => ({
        payload: {
          ...state.payload,
          endDate: date,
        },
      }));
    },
    setMembers: (members) => {
      set((state) => ({
        ...state,
        members: [...members],
      }));
    },
    clearProject: () => {
      set(() => ({ ...initialState }));
    },
  },
}));

export const useProjectState = () => useProjectStore((state) => state);

export const useProjectActions = () => useProjectStore().actions;

export default useProjectStore;
