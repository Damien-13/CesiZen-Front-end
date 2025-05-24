<?php

namespace Database\Seeders;

use App\Models\RelationType;
use App\Models\Ressource;
use App\Models\RessourceCategorie;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RessourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = RessourceCategorie::pluck('id', 'lib_ressource_categorie');
        $relationTypes = RelationType::pluck('id', 'lib_relation_type');

        $ressources = [
            [
                'titre' => 'Améliorer la communication dans le couple',
                'description' => "Apprendre à exprimer clairement ses besoins et à écouter activement son partenaire permet de prévenir les malentendus et de renforcer la confiance.
                    \nApprendre à reformuler, gérer ses émotions et équilibrer les temps de parole est essentiel.
                    \nGérer les désaccords sans conflit et instaurer un dialogue bienveillant favorise la complicité et le respect mutuel.",
                'restreint' => false,
                'valide' => false,
                'url' => 'https://www.psychologies.com/couple/vie-de-couple/Les-3-astuces-pour-ameliorer-la-communication-dans-le-couple-selon-une-experte',
                'categorie' => $categories['Vie de famille'],
                'relation' => $relationTypes['Couple'],
            ],
            [
                'titre' => 'Créer un lien de confiance avec un adolescent',
                'description' => "Construire une relation de confiance avec un adolescent repose sur la patience et l’ouverture.
                    \nUn cadre sécurisant tout en laissant place à l’autonomie est essentiel.
                    \nL’écoute empathique, le respect des émotions et la valorisation des efforts favorisent un dialogue régulier.
                    \nComprendre les enjeux liés à l’identité aide à soutenir l’adolescent face aux défis de cette période.",
                'restreint' => false,
                'valide' => true,
                'url' => null,
                'categorie' => $categories['Vie de famille'],
                'relation' => $relationTypes['Parent-Enfant'],
            ],
            [
                'titre' => 'Apaiser les tensions dans la fratrie',
                'description' => "Les tensions entre frères et sœurs peuvent générer du stress familial.
                    \nReconnaître les besoins de chaque enfant, encourager l’expression des émotions et instaurer des règles claires facilitent la gestion des conflits.
                    \nFavoriser la coopération et la solidarité valorise la singularité de chacun.
                    \nCes actions contribuent à faire de la fratrie un espace d’apprentissage et de complicité durable.",
                'restreint' => false,
                'valide' => true,
                'url' => 'https://www.ateliergigogne.com/actus/comment-gerer-les-conflits-dans-une-fratrie/',
                'categorie' => $categories['Vie de famille'],
                'relation' => $relationTypes['Fratrie'],
            ],
            [
                'titre' => 'Maintenir l’amitié à l’âge adulte',
                'description' => "Entre travail, famille et responsabilités, entretenir ses amitiés demande un engagement conscient.
                    \nCultiver des liens authentiques malgré la distance ou le manque de temps passe par la qualité des échanges, l’acceptation des évolutions personnelles et la capacité à exprimer ses besoins.
                    \nPardonner les absences et créer des moments partagés réguliers renforcent la confiance et la durabilité des relations.",
                'restreint' => false,
                'valide' => true,
                'url' => null,
                'categorie' => $categories['Lien social et entraide'],
                'relation' => $relationTypes['Amitié'],
            ],
            [
                'titre' => 'Soutenir un collègue en difficulté',
                'description' => "Identifier les signes d’alerte chez un collègue (isolement, baisse de motivation, stress visible) est essentiel.
                    \nAdopter une posture d’écoute attentive sans jugement et proposer une aide concrète contribue à améliorer la situation.
                    \nEncourager le recours aux dispositifs d’accompagnement tout en respectant la confidentialité est fondamental pour un climat professionnel sain.",
                'restreint' => false,
                'valide' => true,
                'url' => null,
                'categorie' => $categories['Lien social et entraide'],
                'relation' => $relationTypes['Voisinage'],
            ],
            [
                'titre' => 'Gérer les conflits entre voisins',
                'description' => "Les conflits de voisinage ont un impact direct sur la qualité de vie.
                    \nÉcouter activement les points de vue, communiquer calmement sans reproches et rechercher des solutions communes facilitent la résolution.
                    \nLa médiation peut être une option utile.
                    \nLe respect des règles et de la vie en communauté est un socle indispensable à la coexistence pacifique.",
                'restreint' => false,
                'valide' => true,
                'url' => null,
                'categorie' => $categories['Lien social et entraide'],
                'relation' => $relationTypes['Voisinage'],
            ],
            [
                'titre' => 'Inclure les personnes âgées isolées',
                'description' => "L’isolement social chez les personnes âgées est un enjeu majeur de santé publique.
                    \nLes visites régulières, les échanges intergénérationnels et la participation à des activités collectives renforcent le lien social.
                    \nLe rôle des familles, aidants et communautés est crucial pour créer un environnement accueillant et stimulant.
                    \nCes actions contribuent à améliorer le bien-être mental, l’autonomie et le sentiment d’appartenance.",
                'restreint' => false,
                'valide' => true,
                'url' => null,
                'categorie' => $categories['Lien social et entraide'],
                'relation' => $relationTypes['Amitié'],
            ],
            [
                'titre' => 'Créer une dynamique familiale positive',
                'description' => "Une dynamique familiale saine repose sur l’écoute mutuelle, la coopération et la reconnaissance de chacun.
                    \nL’éducation bienveillante encourage la mise en place de moments partagés, de règles claires et la valorisation des efforts.
                    \nLa gestion apaisée des conflits renforce la cohésion et favorise le bonheur au sein du foyer.",
                'restreint' => true,
                'valide' => true,
                'url' => null,
                'categorie' => $categories['Vie de famille'],
                'relation' => $relationTypes['Parent-Enfant'],
            ],
            [
                'titre' => 'Accompagner un proche en dépression',
                'description' => "L’accompagnement d’une personne dépressive nécessite empathie, patience et respect des limites.
                    \nÉcouter sans juger, encourager la consultation professionnelle et prendre soin de soi sont des éléments essentiels.
                    \nLa connaissance des idées reçues sur la maladie mentale aide à maintenir un lien familial et amical respectueux des rythmes individuels.",
                'restreint' => false,
                'valide' => true,
                'url' => 'https://www.vidal.fr/maladies/psychisme/depression-adulte/aider-proche.html',
                'categorie' => $categories['Santé'],
                'relation' => $relationTypes['Amitié'],
            ],
            [
                'titre' => 'Prévenir l’isolement social chez les jeunes',
                'description' => "L’isolement social des jeunes peut avoir des conséquences graves sur leur développement.
                    \nLes facteurs de risque incluent harcèlement, mal-être et rupture familiale.
                    \nLa création de lieux d’écoute, les activités collectives et l’accompagnement professionnel sont des mesures préventives efficaces.
                    \nLa détection précoce des signes et la valorisation des compétences individuelles favorisent la réinsertion sociale et l’épanouissement.",
                'restreint' => true,
                'valide' => false,
                'url' => null,
                'categorie' => $categories['Lien social et entraide'],
                'relation' => $relationTypes['Parent-Enfant'],
            ],
        ];

        foreach ($ressources as $data) {
            Ressource::create([
                'titre' => $data['titre'],
                'description' => $data['description'],
                'nom_fichier' => null,
                'restreint' => $data['restreint'],
                'valide' => $data['valide'],
                'url' => $data['url'],
                'user_id' => User::inRandomOrder()->first()->id,
                'ressource_categorie_id' => $data['categorie'],
                'ressource_type_id' => 1,
                'relation_type_id' => $data['relation'],
            ]);
        }
    }
}
