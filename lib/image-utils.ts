type ImageSizes = {
  large: string;
  medium: string;
  small: string;
};

type ProjectImages = {
  projectId: number;
  imageCount: number;
};

export const generateMultiProjectImages = (
  projects: ProjectImages[]
): Record<number, ImageSizes[]> => {
  return projects.reduce((acc, { projectId, imageCount }) => {
    acc[projectId] = Array.from({ length: imageCount }, (_, i) => {
      const imageNumber = i + 1;
      return {
        large: `/projects/project-${projectId}/1200x500/l${imageNumber}.png`,
        medium: `/projects/project-${projectId}/800x500/m${imageNumber}.png`,
        small: `/projects/project-${projectId}/600x400/s${imageNumber}.png`,
      };
    });
    return acc;
  }, {} as Record<number, ImageSizes[]>);
};

const projectsConfig: ProjectImages[] = [
  { projectId: 1, imageCount: 2 },
  { projectId: 2, imageCount: 11 },
  { projectId: 3, imageCount: 2 },
];

export const allProjectImages = generateMultiProjectImages(projectsConfig);
