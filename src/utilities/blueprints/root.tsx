export class defaultData {
  '.stellar' = {
    format_version: 1,
  };
  center = 0;
  offset = {
    x: 0,
    y: 0,
  };
  parts = [];
  stages = [];
}

export type type = InstanceType<typeof defaultData>;
