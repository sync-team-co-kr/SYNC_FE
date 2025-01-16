import { IMember } from '@customTypes/member';
import { IProject, RawProject } from '@customTypes/project';
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

const initialState: IProject = {
  projectId: 0,
  title: '',
  thumbnail: {
    type: 'N',
    value: '',
  },
  subTitle: '',
  description: '',
  startDate: undefined,
  endDate: undefined,
  members: [],
};

const useProjectStore = create<IProject & ProjectActions>((set) => ({
  ...initialState,
  actions: {
    setProject: (project) => {
      set(() => ({
        ...project,
        startDate: project.startDate ? new Date(project.startDate) : undefined,
        endDate: project.endDate ? new Date(project.endDate) : undefined,
        thumbnail: project.thumbnail
          ? {
              type: 'E',
              value: project.thumbnail,
            }
          : {
              type: 'N',
              value: '',
            },
      }));
    },
    setTitle: (title) => {
      set((state) => ({
        ...state,
        title,
      }));
    },
    setThumbnail: (thumbnailType, thumbnail) => {
      set((state) => ({
        ...state,
        thumbnail: {
          type: thumbnailType,
          value: thumbnail,
        },
      }));
    },
    setSubTitle: (subTitle) => {
      set((state) => ({
        ...state,
        subTitle,
      }));
    },
    setDescription: (description) => {
      set((state) => ({
        ...state,
        description,
      }));
    },
    setStartDate: (date) => {
      set((state) => ({
        ...state,
        startDate: date,
      }));
    },
    setEndDate: (date) => {
      set((state) => ({
        ...state,
        endDate: date,
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
