import { Timestamp } from "typeorm";

export class CreateHackernewsCronDto {}
export class EntityDto {
  id: number;
  title: string;
  by: string;
  descendants: number;
  text: string;
  score: number;
  kids: number[];
  time: number;
  url: string;
  dead: boolean;
  deleted: boolean;
  type: EntityType;
  parent: number;
  poll: number;
  parts: number[];
}

export class StoryDto {
  external_id: number;
  title: string;
  text: string;
  score: number;
  dead: boolean;
  deleted_at: number;
  created_at: number;
  descendant_count: number;
  kids: number[];
  created_by_id: number;
}

export class CommentDto {
    external_id: number;
    text: string;
    score: number;
    dead: boolean;
    deleted_at: Date;
    created_at: Date;
    parent_comment_id: number;
    entity_id: number;
    kids?: number[];
    created_by_id: number;
  }

  export class UserDto {
    about: string;
    karma: number;
    dead?: boolean;
    deleted_at?: number;
    created: number;
    id: string;
  }

export enum EntityType {
  story = 'story',
  job = 'job',
  comment = 'comment',
  poll = 'poll',
  pollopt = 'pollopt',
}
