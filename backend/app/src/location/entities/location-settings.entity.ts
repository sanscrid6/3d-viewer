import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Location } from './location.entity';

@Entity()
export class LocationSettings {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Location, { onDelete: 'CASCADE' })
  user: Location;

  @Column()
  previeweUrl: string;
}
