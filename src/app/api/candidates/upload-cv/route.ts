import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('cv') as File | null;
        const candidateId = formData.get('candidateId') as string | null;

        if (!file) {
            return NextResponse.json({ success: false, message: 'Aucun fichier fourni.' }, { status: 400 });
        }

        // Validate file type (PDF only)
        if (file.type !== 'application/pdf') {
            return NextResponse.json(
                { success: false, message: 'Seuls les fichiers PDF sont acceptés.' },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, message: 'Le fichier ne doit pas dépasser 5 Mo.' },
                { status: 400 }
            );
        }

        // Generate unique file path
        const timestamp = Date.now();
        const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filePath = `cvs/${candidateId || 'anonymous'}/${timestamp}-${cleanName}`;

        // Upload to Supabase Storage
        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = new Uint8Array(arrayBuffer);

        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
            .from('candidate-cvs')
            .upload(filePath, fileBuffer, {
                contentType: 'application/pdf',
                upsert: false,
            });

        if (uploadError) {
            console.error('Storage upload error:', uploadError);
            return NextResponse.json(
                { success: false, message: 'Erreur lors de l\'upload du fichier.' },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
            .from('candidate-cvs')
            .getPublicUrl(uploadData.path);

        // Insert document record if candidateId provided
        if (candidateId) {
            const { error: docError } = await supabaseAdmin
                .from('candidate_documents')
                .insert({
                    candidate_id: candidateId,
                    type: 'cv',
                    file_url: urlData.publicUrl,
                    file_name: file.name,
                    file_size: file.size,
                    mime_type: 'application/pdf',
                });

            if (docError) {
                console.error('Document record error:', docError);
            }
        }

        return NextResponse.json(
            {
                success: true,
                message: 'CV uploadé avec succès.',
                fileUrl: urlData.publicUrl,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Upload CV API error:', error);
        return NextResponse.json({ success: false, message: 'Erreur lors de l\'upload.' }, { status: 500 });
    }
}
