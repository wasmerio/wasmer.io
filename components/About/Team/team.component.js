import React from 'react';
import { AvatarComponent } from './components/Avatar/avatar.component';
import { LinksComponent } from './components/Links/links.component';
import team from './team.constants';
import styles from './team.module.css';

export const TeamComponent = () => {
  return (
    <div className="container my-page">
      <h2 className="text-2xl font-bold text-left md:text-center mb-12">
        Meet the team
      </h2>
      <div className={styles.teamContainer}>
        {team.map(({ name, description, image, links }, index) => (
          <div key={index}>
            <AvatarComponent image={image} name={name} />
            <div className="px-4">
              <h3 className="font-bold text-secondary mt-8 mb-3">{name}</h3>
              <p>{description}</p>
              {links && <LinksComponent links={links} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
