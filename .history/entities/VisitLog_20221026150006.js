import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("user_visit_log", ["userId"], {})
@Entity("visit_log", { schema: "community" })
export class VisitLog {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("datetime", {
    name: "visited_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  visitedAt: Date | null;

  @ManyToOne(() => User, (user) => user.visitLogs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
