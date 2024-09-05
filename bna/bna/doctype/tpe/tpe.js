frappe.ui.form.on('TPE', {
    refresh: function(frm) {
        frm.trigger('check_etat_tpe');
        frm.trigger('check_deploiement_tpe'); // Ajouter le déclencheur pour la case à cocher
    },

    etat_tpe: function(frm) {
        frm.trigger('check_etat_tpe');
    },

    date_reception_dre: function(frm) {
        frm.trigger('check_date_reception_dre');
    },

    action_dre_tpe: function(frm) {
        frm.trigger('check_action_dre_tpe');
    },

    date_transmission_dipm: function(frm) {
        frm.trigger('check_date_transmission_dipm');
    },

    date_retour_dipm: function(frm) {
        frm.trigger('check_date_retour_dipm');
    },

    nature_reparation_tpe: function(frm) {
        frm.trigger('check_nature_reparation_tpe');
    },

    deploiement_tpe: function(frm) { // Ajouter le déclencheur pour la case à cocher
        frm.trigger('check_deploiement_tpe');
    },

    date_deploiement_tpe: function(frm) { // Ajouter le déclencheur pour vérifier la date de déploiement
        frm.trigger('check_date_deploiement_tpe');
    },

    check_etat_tpe: function(frm) {
        if (frm.doc.etat_tpe === 'En panne') {
            frm.set_df_property('date_reception_dre', 'hidden', 0);
        } else {
            frm.set_df_property('date_reception_dre', 'hidden', 1);
            frm.set_value('date_reception_dre', '');
        }

        if (frm.doc.etat_tpe === 'Annulé') {
            frm.set_value('agence', 'Annulé');
            frm.set_value('nom_client', 'Annulé');
            frm.set_value('nom_tpe', 'Annulé');
            
            frm.set_df_property('agence', 'hidden', 1);
            frm.set_df_property('nom_client', 'hidden', 1);
            frm.set_df_property('nom_tpe', 'hidden', 1);
        } else {
            frm.set_df_property('agence', 'hidden', 0);
            frm.set_df_property('nom_client', 'hidden', 0);
            frm.set_df_property('nom_tpe', 'hidden', 0);
        }

        frm.trigger('check_date_reception_dre');
    },

    check_date_reception_dre: function(frm) {
        if (frm.doc.date_reception_dre) {
            frm.set_df_property('action_dre_tpe', 'hidden', 0);
        } else {
            frm.set_df_property('action_dre_tpe', 'hidden', 1);
            frm.set_value('action_dre_tpe', '');
        }
        frm.trigger('check_action_dre_tpe');
    },

    check_action_dre_tpe: function(frm) {
        if (frm.doc.action_dre_tpe === 'Réparé à la dre') {
            frm.set_df_property('date_retour_agence', 'hidden', 0);
            frm.set_df_property('date_transmission_dipm', 'hidden', 1);
            frm.set_value('date_transmission_dipm', '');
            frm.set_value('date_retour_dipm', '');
        } else if (frm.doc.action_dre_tpe === 'Transmis à DIPM') {
            frm.set_df_property('date_transmission_dipm', 'hidden', 0);
            frm.set_df_property('date_retour_agence', 'hidden', 1);
            frm.set_value('date_retour_agence', '');
        } else {
            frm.set_df_property('date_retour_agence', 'hidden', 1);
            frm.set_df_property('date_transmission_dipm', 'hidden', 1);
            frm.set_df_property('date_retour_dipm', 'hidden', 1);
            frm.set_value('date_retour_agence', '');
            frm.set_value('date_transmission_dipm', '');
            frm.set_value('date_retour_dipm', '');
        }
    },

    check_date_transmission_dipm: function(frm) {
        if (frm.doc.date_transmission_dipm) {
            frm.set_df_property('date_retour_dipm', 'hidden', 0);
        } else {
            frm.set_df_property('date_retour_dipm', 'hidden', 1);
            frm.set_value('date_retour_dipm', '');
        }
    },

    check_date_retour_dipm: function(frm) {
        if (frm.doc.date_retour_dipm) {
            frm.set_df_property('nature_reparation_tpe', 'hidden', 0);
        } else {
            frm.set_df_property('nature_reparation_tpe', 'hidden', 1);
            frm.set_value('nature_reparation_tpe', '');
        }
    },

    check_nature_reparation_tpe: function(frm) {
        if (frm.doc.nature_reparation_tpe === 'Changement d\'opérateur') {
            frm.set_value('numero_sim', ''); // Vider le champ numero_sim
        }

        if (frm.doc.nature_reparation_tpe === 'Remplacer') {
            frm.set_value('numero_serie_tpe', ''); // Vider le champ numero_serie_tpe
            frm.set_value('numero_sim', ''); // Vider le champ numero_sim
            frm.set_value('model_tpe', ''); // Vider le champ model_tpe
        }

        if (frm.doc.nature_reparation_tpe || frm.doc.action_dre_tpe === 'Réparé à la dre') {
            frm.set_df_property('date_retour_agence', 'hidden', 0);
        } else {
            frm.set_df_property('date_retour_agence', 'hidden', 1);
            frm.set_value('date_retour_agence', '');
        }
    },

    check_deploiement_tpe: function(frm) { // Fonction pour vérifier la case à cocher
        if (frm.doc.deploiement_tpe) {
            frm.set_df_property('date_deploiement_tpe', 'hidden', 0);
        } else {
            frm.set_df_property('date_deploiement_tpe', 'hidden', 1);
            frm.set_value('date_deploiement_tpe', '');
        }

        frm.trigger('check_date_deploiement_tpe'); // Vérifier la visibilité de pv_dinstallation_tpe
    },

    check_date_deploiement_tpe: function(frm) {
        if (frm.doc.date_deploiement_tpe) {
            frm.set_df_property('pv_dinstallation_tpe', 'hidden', 0);
        } else {
            frm.set_df_property('pv_dinstallation_tpe', 'hidden', 1);
            frm.set_value('pv_dinstallation_tpe', '');
        }
    },

    validate: function(frm) {
        // Vérifiez si la case à cocher 'enregistrer_historique' est activée
        if (frm.doc.enregistrer_historique) {
            // Enregistrer les données dans l'historique
            frm.doc.historique_tpe.push({
                'historique_etat_tpe': frm.doc.etat_tpe,
                'historique_date_reception_dre': frm.doc.date_reception_dre,
                'historique_action_dre_tpe': frm.doc.action_dre_tpe,
                'historique_date_transmission_dipm': frm.doc.date_transmission_dipm,
                'historique_date_retour_dipm': frm.doc.date_retour_dipm,
                'historique_nature_reparation_tpe': frm.doc.nature_reparation_tpe,
                'historique_date_retour_agence': frm.doc.date_retour_agence,
                'historique_agence': frm.doc.agence,
                'historique_nom_client': frm.doc.nom_client,
                'historique_nom_tpe': frm.doc.nom_tpe,
                'historique_numero_serie_tpe': frm.doc.numero_serie_tpe,
                'historique_numero_sim': frm.doc.numero_sim,
                'historique_model_tpe': frm.doc.model_tpe
            });

            // Si date_retour_agence est rempli, mettre à jour l'état et vider certains champs
            if (frm.doc.date_retour_agence) {
                frm.set_value('etat_tpe', 'Fonctionnel');
                frm.set_value('date_reception_dre', '');
                frm.set_value('action_dre_tpe', '');
                frm.set_value('date_transmission_dipm', '');
                frm.set_value('date_retour_dipm', '');
                frm.set_value('nature_reparation_tpe', '');
                frm.set_value('date_retour_agence', '');
            }
        }
    }
});





