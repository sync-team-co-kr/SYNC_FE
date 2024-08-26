import { vars } from 'token';

export const WORK_TAGS_STYLE = {
  task: {
    backgroundColor: vars.sementic.color.lightPurple,
    color: vars.sementic.color.purple,
  },
  subTask: {
    backgroundColor: vars.sementic.color.alertLightOrange,
    color: vars.sementic.color.alertOrange,
  },
  quest: {
    backgroundColor: vars.sementic.color.lightGreen,
    color: vars.sementic.color.green,
  },
};

export const SITUATION_TAGS_STYLE = {
  todo: {
    backgroundColor: vars.sementic.color.lightRed,
    color: vars.sementic.color.negativeRed,
  },

  doing: {
    backgroundColor: vars.sementic.color.lightBlue,
    color: vars.sementic.color.positiveBlue,
  },

  done: {
    backgroundColor: '#F4F4F4',
    color: vars.sementic.color.black35,
  },
};

export const WORK_TAG = {
  task: '업무',
  subTask: '서브테스크',
  quest: '퀘스트',
};

export const SITUATION_TAG = {
  todo: '해야할 일',
  doing: '진행중',
  done: '완료',
};

export const TAG_LIST = {
  WORK_TAG,
  SITUATION_TAG,
} as const;
