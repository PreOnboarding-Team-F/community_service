import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "./Board";
import { Comment } from "./Comment";
import { VisitLog } from "./VisitLog";

@Index("user_id", ["userId"], { unique: true })
@Index("nickname", ["nickname"], { unique: true })
@Index("phone_number", ["phoneNumber"], { unique: true })
@Entity("user", { schema: "community" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "user_id", unique: true, length: 20 })
  userId: string;

  @Column("varchar", { name: "password", length: 20 })
  password: string;

  @Column("varchar", { name: "nickname", unique: true, length: 20 })
  nickname: string;

  @Column("varchar", { name: "gender", length: 5 })
  gender: string;

  @Column("datetime", { name: "birth" })
  birth: Date;

  @Column("varchar", { name: "phone_number", unique: true, length: 50 })
  phoneNumber: string;

  @Column("tinyint", {
    name: "is_admin",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isAdmin: boolean | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @Column("datetime", {
    name: "visited_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  visitedAt: Date | null;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => VisitLog, (visitLog) => visitLog.user)
  visitLogs: VisitLog[];
}
