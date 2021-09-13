import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Music } from "./Music";

export type MinisterioType = "sdn-alber" | "sdn-lucimeire" | "adolescentes"

@Entity()
export class MinisterioInfo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "enum",
    enum: ["sdn-alber", "sdn-lucimeire", "adolescentes"]
  })
  ministerio: MinisterioType

  @ManyToOne(() => Music, music => music.ministeriosInfo, {
    onDelete: "CASCADE"
  })
  music: Music

  @Column({
    length: 5
  })
  tom: string

  @Column({ type: "date", default: "NOW()" })
  lastPlayed: Date
}
