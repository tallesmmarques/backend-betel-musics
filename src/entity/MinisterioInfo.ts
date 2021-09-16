import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Music } from "./Music";

export type MinisterioType = "sdn-alber" | "sdn-lucy" | "adolescentes"

@Entity()
export class MinisterioInfo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "enum",
    enum: ["sdn-alber", "sdn-lucy", "adolescentes"]
  })
  ministerio: MinisterioType

  @ManyToOne(() => Music, music => music.ministeriosInfo, {
    onDelete: "CASCADE"
  })
  music: Music

  @Column({
    length: 5,
    nullable: true
  })
  tom: string

  @Column({ type: "date", nullable: true })
  lastPlayed: Date
}
