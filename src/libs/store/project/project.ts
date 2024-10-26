import { IMember } from '@customTypes/member';
import { IProject, RawProject } from '@customTypes/project';
import { create } from 'zustand';

interface ProjectActions {
  actions: {
    setProject: (project: RawProject) => void;
    setTitle: (title: string) => void;
    setThumbnail: (thumbnail: string) => void;
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
  thumbnail: '',
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
      }));
    },
    setTitle: (title) => {
      set((state) => ({
        ...state,
        title,
      }));
    },
    setThumbnail: (thumbnail) => {
      set((state) => ({
        ...state,
        thumbnail,
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
