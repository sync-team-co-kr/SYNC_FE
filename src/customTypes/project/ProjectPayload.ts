interface ProjectPayload {
  title: string;
  thumbnail: {
    type: 'N' | 'E' | 'C' | 'I';
    value: string | Blob;
  };
  subTitle: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
}

export default ProjectPayload;
